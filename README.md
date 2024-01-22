# dqedit
The dqedit component is the editor for the mapping necessary to translate domain questions / RQA definitions to technical RQA configurations. The editor can be used by domain and technical experts during DDD-based workshops, e.g., for event storming or DST, where the domain elements are identified and defined.

A more detailed description of this component's architecture is provided in the [arc42 document](https://github.com/dqualizer/dqualizer/tree/main/docs/asciidoc).

## How to build and run
### Docker
* `docker buildx build --tag ghcr.io/dqualizer/dqedit:latest .`
* `docker run ghcr.io/dqualizer/dqedit:latest`

### Locally
* `npm i`
* `npm run dev`

## Usage
* Go to http://localhost:3000 and start editing