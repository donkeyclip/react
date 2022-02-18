import React, { Component } from "react";

export default class DonkeyClip extends Component<
  {
    id: string;
    height?: string;
    width?: string;
    controls?: boolean;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    volume?: number;
    scaletofit?: string;
    backgroundcolor?: string;
    mcversion?: string;
    bundlerversion?: string;
    pointerevents?: boolean;
    initParams?: any;
  },
  { definition: any; dataset: Array<string> }
> {
  iframe: HTMLIFrameElement | null;
  constructor(props: {
    id: string;
    height?: string;
    width?: string;
    controls?: boolean;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    volume?: number;
    scaletofit?: string;
    backgroundcolor?: string;
    mcversion?: string;
    bundlerversion?: string;
    pointerevents?: boolean;
    initParams?: any;
  }) {
    super(props);
    this.state = {
      definition: {},
      dataset: [
        "controls",
        "autoplay",
        "loop",
        "muted",
        "volume",
        "scaletofit",
        "backgroundcolor",
        "mcversion",
        "bundlerversion",
        "pointerevents",
      ],
    };
  }
  componentDidMount() {
    fetch(`https://staging-api.donkeyclip.com/v1/clips/${this.props.id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then(({ data }) => {
        if (!this.iframe) return;
        if (this.props.initParams) {
          data.definition.props.initParams = this.props.initParams;
        }
        this.iframe.contentWindow.document.head.innerHTML = `
        <head>
            <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
            <style>
              html,body {
                width: 100%;
                height: 100%;
                position: relative;
                margin: 0px;
                padding: 0px;
                background-color: black;
              }
            </style>
        </head>`;

        this.iframe.contentWindow.document.body.innerHTML = `<body></body>`;

        const donkeyClipScript = document.createElement("script");
        donkeyClipScript.innerHTML = `window.DonkeyClip = {Definition: ${JSON.stringify(
          data.definition
        )}}; console.log(JSON.stringify(window.DonkeyClip))`;
        this.iframe?.contentWindow?.document.head.appendChild(donkeyClipScript);
        const bundlerScript = this.makeScript();

        this.iframe?.contentWindow?.document.body.appendChild(bundlerScript);
      });
  }

  makeScript() {
    const { bundlerversion = "latest" } = this.props;
    const bundlerScript = document.createElement("script");
    bundlerScript.src = `https://cdn.jsdelivr.net/npm/@donkeyclip/bundler@${bundlerversion}`;
    bundlerScript.async = true;

    bundlerScript.dataset.id = this.props.id;

    this.state.dataset.forEach((parameter) => {
      if (typeof this.props[parameter] !== "undefined")
        bundlerScript.dataset[parameter] = String(this.props[parameter]);
    });
    return bundlerScript;
  }

  render() {
    return (
      <iframe
        ref={(elem) => (this.iframe = elem)}
        width={this.props.width}
        height={this.props.height}
        title="current clip"
        style={{
          border: "none",
          width: this.props.width || "100%",
          height: this.props.height || "100%",
        }}
      />
    );
  }
}
