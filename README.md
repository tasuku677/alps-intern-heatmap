# Heatmap Panel Plugin for Grafana
![SANSK5A001x](/src/img/SANSK5A001x.png)

![car-dodge](/src/img/car-dodge.png)

## Overview
This Grafana plugin provides a custom panel that integrates Konva.js and heatmap.js to visualize product defect data.
It overlays heatmaps on top of an image based on input points and displays tooltips showing the corresponding values.

The plugin includes two main modes:

**Input Mode** – Users click on product defect locations, which are then submitted to the database.

**Visualization Mode** – Displays aggregated defect statistics as a heatmap over the product image.
<img width="527" height="202" alt="image" src="https://github.com/user-attachments/assets/b7b258b2-158d-44ce-80ec-32eaf4928f82" />

## What are Grafana panel plugins? (By Grafana)

Panel plugins allow you to add new types of visualizations to your dashboard, such as maps, clocks, pie charts, lists, and more.

Use panel plugins when you want to do things like visualize data returned by data source queries, navigate between dashboards, or control external systems (such as smart home devices).


## Getting started  

### Frontend

1. Install dependencies

   ```bash
   npm install
   ```

2. Build plugin in development mode and run in watch mode

   ```bash
   npm run dev
   ```

3. Build plugin in production mode

   ```bash
   npm run build
   ```

### Grafana Server
To launch the Grafana development server using Docker, run:

```bash
docker-compose up
```

### Install plugin
Follow the instruction: 
https://grafana.com/docs/grafana/latest/administration/plugin-management/#install-plugin-on-local-grafana

<!-- 4. Run the tests (using Jest)

   ```bash
   # Runs the tests and watches for changes, requires git init first
   npm run test

   # Exits after running all the tests
   npm run test:ci
   ```

5. Spin up a Grafana instance and run the plugin inside it (using Docker)

   ```bash
   npm run server
   ```

6. Run the E2E tests (using Cypress)

   ```bash
   # Spins up a Grafana instance first that we tests against
   npm run server

   # Starts the tests
   npm run e2e
   ```

7. Run the linter

   ```bash
   npm run lint

   # or

   npm run lint:fix
   ``` -->

# Dependencies
This plugin depends on the following external libraries:

- [Grafana](https://grafana.com/): Version: `10.4.0` or later: The dashboard and visualization platform where this plugin is used. 
- [React](https://react.dev/):
A TypeScript framework for building user interfaces.
- [Konva.js](https://konvajs.org/index.html):
A 2D canvas library for drawing complex shapes.
- [heatmpa.js](https://www.patrick-wied.at/static/heatmapjs/):
A JavaScript library for visualizing data with a heatmap.

# Plugin Options
The panel has the following options:
- 'Image backend endpoint': The URL of the image to be displayed and overlaid with a heatmap, formatted as `http://{server address:}:{port number}/image/`.
   
   Please note that `{server address}` and `{port number}` are variables and should be replaced with the actual server address and port number.
   
   ![panel-option](/src/img/panel-option.png)   


# Example of required input data
```
{
  "points": {
    "testversion": [
      [548, 62],
      [1604, 103],
      [751, 145],
      [1198, 145],
      [386, 269],
      [548, 269]
    ]
  },
  "versions": ["testversion"],
  "media_asset_id": "SANSK5A001x"
}

```


<!-- 
# Distributing your plugin

When distributing a Grafana plugin either within the community or privately the plugin must be signed so the Grafana application can verify its authenticity. This can be done with the `@grafana/sign-plugin` package.

_Note: It's not necessary to sign a plugin during development. The docker development environment that is scaffolded with `@grafana/create-plugin` caters for running the plugin without a signature._

## Initial steps

Before signing a plugin please read the Grafana [plugin publishing and signing criteria](https://grafana.com/legal/plugins/#plugin-publishing-and-signing-criteria) documentation carefully.

`@grafana/create-plugin` has added the necessary commands and workflows to make signing and distributing a plugin via the grafana plugins catalog as straightforward as possible.

Before signing a plugin for the first time please consult the Grafana [plugin signature levels](https://grafana.com/legal/plugins/#what-are-the-different-classifications-of-plugins) documentation to understand the differences between the types of signature level.

1. Create a [Grafana Cloud account](https://grafana.com/signup).
2. Make sure that the first part of the plugin ID matches the slug of your Grafana Cloud account.
   - _You can find the plugin ID in the `plugin.json` file inside your plugin directory. For example, if your account slug is `acmecorp`, you need to prefix the plugin ID with `acmecorp-`._
3. Create a Grafana Cloud API key with the `PluginPublisher` role.
4. Keep a record of this API key as it will be required for signing a plugin

## Signing a plugin

### Using Github actions release workflow

If the plugin is using the github actions supplied with `@grafana/create-plugin` signing a plugin is included out of the box. The [release workflow](./.github/workflows/release.yml) can prepare everything to make submitting your plugin to Grafana as easy as possible. Before being able to sign the plugin however a secret needs adding to the Github repository.

1. Please navigate to "settings > secrets > actions" within your repo to create secrets.
2. Click "New repository secret"
3. Name the secret "GRAFANA_API_KEY"
4. Paste your Grafana Cloud API key in the Secret field
5. Click "Add secret"

#### Push a version tag

To trigger the workflow we need to push a version tag to github. This can be achieved with the following steps:

1. Run `npm version <major|minor|patch>`
2. Run `git push origin main --follow-tags`

## Learn more

Below you can find source code for existing app plugins and other related documentation.

- [Basic panel plugin example](https://github.com/grafana/grafana-plugin-examples/tree/master/examples/panel-basic#readme)
- [`plugin.json` documentation](https://grafana.com/developers/plugin-tools/reference/plugin-json)
- [How to sign a plugin?](https://grafana.com/developers/plugin-tools/publish-a-plugin/sign-a-plugin) -->
