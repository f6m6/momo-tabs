import { ContentState } from "draft-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IDecoratedComponentProps } from "../utils/decoratedComponentProps";

export class Chord extends React.PureComponent<IDecoratedComponentProps, {}> {
    public render() {
        return (
            <span className="score-content-chord">
                {this.props.children}
            </span>
        );
    }
}
