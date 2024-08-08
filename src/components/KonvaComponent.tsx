import React, { useState, useEffect, useRef } from 'react';
import Konva from 'konva';
import heatmap from 'heatmap.js';
import { convertToHashMap, hashToHeatData } from '../utils/helper.js';

interface KonvaComponentProps {
    data: Array<[number, number]>;
    width: number;
    height: number;
    imageUrl: string;
  }
const KonvaComponent: React.FC<KonvaComponentProps>= ({ data, width, height, imageUrl }) => {
    const [stage, setStage] = useState<Konva.Stage | null>(null);
    const [, setLayer] = useState<Konva.Layer | null>(null);
    const [heatmapInstance, setHeatmapInstance] = useState<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const heatmapRef = useRef<HTMLDivElement>(null);
    const legendRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        clearAll();
        initializeKonva(data, imageUrl);
    }, [data, width, height, imageUrl]);

    const initializeKonva = (data: Array<[number, number]>, imageUrl:string) => {
        if (imageUrl && containerRef.current) {
            const stageInstance = new Konva.Stage({
                container: containerRef.current || 'container',
                width: width,
                height: height,
            });
            const layerInstance = new Konva.Layer();
            stageInstance.add(layerInstance);

            setStage(stageInstance);
            setLayer(layerInstance);

            const imageObj = new Image();
            imageObj.src = imageUrl;
            imageObj.onload = () => {
                const widthScale = stageInstance.width() / imageObj.width;
                const heightScale = stageInstance.height() / imageObj.height;
                const scale = Math.min(widthScale, heightScale);

                drawImage(imageObj, layerInstance, stageInstance, scale);
                drawHeatmap(data, imageObj, layerInstance, stageInstance, scale);
            };
        }
    };

    const drawImage = (imageObj: HTMLImageElement, layerInstance: Konva.Layer, stageInstance: Konva.Stage, scale: number) => {
        const konvaImage = new Konva.Image({
            x: (stageInstance.width() - imageObj.width * scale) / 2,
            y: (stageInstance.height() - imageObj.height * scale) / 2,
            image: imageObj,
            width: imageObj.width * scale,
            height: imageObj.height * scale,
            stroke: 'Black',
            id: 'konvaImage',
        });
        layerInstance.add(konvaImage);
        layerInstance.draw();
    };

    const drawHeatmap = (data: Array<[number, number]>, imageObj: HTMLImageElement, layerInstance: Konva.Layer, stageInstance: Konva.Stage, scale: number) => {
        if (!heatmapRef.current) {
            console.error("Heatmap container not found");
            return;
        }
        const heatmapConfig = {
            container: heatmapRef.current,
            radius: Math.round(40 * scale),
            maxOpacity: 1,
            minOpacity: 0,
            blur: 0.8,
            gradient: {
                '0.1': 'blue',
                '0.5': 'yellow',
                '1.0': 'red',
              }
        };
        const clickedHash: { [key: string]: number } = convertToHashMap(data);
        const { heatmapData, minValue, maxValue } = hashToHeatData(clickedHash, scale, (stageInstance.width() - imageObj.width * scale) / 2, (stageInstance.height() - imageObj.height * scale) / 2);
        const heatmapInstance = heatmap.create(heatmapConfig);
        heatmapInstance.setData({
            max: maxValue,
            data: heatmapData,
            min: 0
        });
        const heatmapCanvas = heatmapConfig.container.querySelector('canvas');
        if (heatmapCanvas) {
            const heatmapImage = new Konva.Image({
                x: 0,
                y: 0,
                image: heatmapCanvas,
                width: heatmapCanvas.width,
                height: heatmapCanvas.height,
                listening: false,
                id: 'heatmapImage',
            });
            layerInstance.add(heatmapImage);
            layerInstance.batchDraw();
        }
        heatmapRef.current.style.display = 'none'; // Hide the heatmap, which is drawn automatically by heatmap.js
        setHeatmapInstance(heatmapInstance);
        drawLegend(minValue, maxValue);
        showToolTip(heatmapInstance, layerInstance, stageInstance);
    };

    const drawLegend = (minValue: number, maxValue: number) => {
        if (!legendRef.current) { return };
        const gradient = `
      <div style="width: 100%; height: 100%; background: linear-gradient(to right, blue, yellow 50%, red">
      </div>
      <div style="display:flex; justify-content:space-between;">
        <div>${minValue}</div>
        <div>${maxValue}</div>
      </div>`;
        legendRef.current.innerHTML = gradient;
        legendRef.current.style.display = 'inline';
    };

    const showToolTip = (heatmapInstance: any, layerInstance: Konva.Layer, stageInstance: Konva.Stage) => {
        const konvaImage: Konva.Image | undefined = layerInstance.findOne('#konvaImage') as Konva.Image;
        let group: Konva.Group | null;
        let text: Konva.Text | null;
        let box: Konva.Rect | null;
        let isMouseDown = false;

        konvaImage.on('touchstart mousedown', () => {
            if (group) {
                group.destroy();
                group = null;
            }

            isMouseDown = true;
            const pos = stageInstance.getPointerPosition();
            if (pos) {
                let x = Math.round(pos.x);
                let y = Math.round(pos.y);
                let groupPosition = { x, y };
                if (x > konvaImage.width() - 80) {
                    groupPosition.x -= 80;
                }
                if (y < 45) {
                    groupPosition.y += 45;
                }
                group = new Konva.Group({
                    x: groupPosition.x + 15,
                    y: groupPosition.y - 15,
                    listening: false,
                });
                let value = heatmapInstance.getValueAt({
                    x: Math.round(x),
                    y: Math.round(y),
                });
                box = new Konva.Rect({
                    width: 50,
                    height: 30,
                    fill: 'black',
                    opacity: 0.75,
                    id: 'tooltip',
                });
                text = new Konva.Text({
                    x: box.x() + 10,
                    y: box.y() + 10,
                    text: `${value}`,
                    fontSize: 14,
                    fill: 'white',
                    width: box.width() - 20,
                    align: 'center',
                });
                group.add(box);
                group.add(text);
                layerInstance.add(group);
                layerInstance.batchDraw();
            }
        });

        konvaImage.on('touchmove mousemove', () => {
            const pos = stageInstance.getPointerPosition();
            if (isMouseDown) {
                if (pos) {
                    let x = Math.round(pos.x);
                    let y = Math.round(pos.y);
                    let groupPosition = { x, y };
                    if (x > konvaImage.width() - 80) {
                        groupPosition.x -= 80;
                    }
                    if (y < 45) {
                        groupPosition.y += 45;
                    }
                    if (group) {
                        group.x(groupPosition.x + 15);
                        group.y(groupPosition.y - 15);
                    }
                    let value = heatmapInstance.getValueAt({
                        x: Math.round(x),
                        y: Math.round(y),
                    });
                    if (text) {
                        text.text(`${value}`);
                    }
                    layerInstance.batchDraw();
                }
            }
        });

        konvaImage.on('touchend mouseup', () => {
            isMouseDown = false;
            if (group) {
                group.destroy();
                group = null;
            }
            layerInstance.batchDraw();
        });
    };

    const clearAll = () => {
        if (stage) {
            stage.destroy();
            setStage(null);
        }
        setLayer(null);

        if (heatmapInstance) {
            heatmapInstance.setData({ max: 0, data: [], min: 0 });
            setHeatmapInstance(null);
        }

        if (containerRef.current) {
            containerRef.current.innerHTML = '';
        }
        if (heatmapRef.current) {
            heatmapRef.current.innerHTML = '';
            heatmapRef.current.style.display = 'block';
        }
        if (legendRef.current) {
            legendRef.current.innerHTML = '';
            legendRef.current.style.display = 'none';
        }
    };

    return (
        <div style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}>
            <div id="container" ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}></div>
            <div id="heatmap" ref={heatmapRef} style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}></div>
            <div id="legend" ref={legendRef} style={{ position: 'fixed', top: '10px', right: '10px', width: '10%', height: '5%', background: 'linear-gradient(to left, rgba(255, 0, 0, 0.8), rgba(255, 255, 0, 0.8), rgba(0, 255, 0, 0.8), rgba(0, 0, 255, 0.6))', border: '1px solid #000', display: 'none' }}></div>
        </div>
    );
};

export { KonvaComponent };
