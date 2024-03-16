# Google Groups Messanger

Create new conversation in Google groups using playwright (with Firefox as a headless browser).

_(Have in mind that this will work only if you don't have two-factor authentication for your gmail account)_

## Usage

Copy `example.config.json` to `config.json` and fill the placeholders.

### Locally

1. Run `yarn`
2. Run `yarn playwright install
3. Run `yarn dev` and open http://localhost:8080/
4. You'll probably need to update `/server/public/index.html` with your pre-filled subject and text.

### In the cloud

The project is prepared for deploying in GCP's cloud run.

1. Copy `example.cloudbuild.yaml` to `cloudbuild.yaml` and replace the placeholders.
2. Run `yarn deploy` (Of course you should have `gcloud` CLI already working)