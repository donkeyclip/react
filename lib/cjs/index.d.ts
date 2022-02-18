import { Component } from "react";
export default class DonkeyClip extends Component<{
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
}, {
    definition: any;
    dataset: Array<string>;
}> {
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
    });
    componentDidMount(): void;
    makeScript(): HTMLScriptElement;
    render(): JSX.Element;
}
