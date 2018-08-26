import * as React from "react";
import { connect } from "react-redux";
import { IAppState, selectSong, selectCanEditSong } from "../../store";
import { Dispatch } from "redux";
import { ISongApi } from "../../commons";
import { EditableText } from "@blueprintjs/core";
import { updateSong } from "./songUtils";

export interface ISongHeaderOwnProps {
    id: string;
}

export interface ISongHeaderStateProps {
    song: ISongApi | undefined;
    canEditSong: boolean;
}

export interface ISongHeaderDispatchProps {}

export type ISongHeaderProps = ISongHeaderOwnProps & ISongHeaderStateProps & ISongHeaderDispatchProps;

export class UnconnectedSongHeader extends React.Component<ISongHeaderProps, {}> {
    public render() {
        const { song, canEditSong } = this.props;
        if (song === undefined) {
            return null;
        }
        const { title, artist } = song;
        return (
            <div className="song-header">
                <div className="song-header-song-info">
                    <EditableText
                        className="song-header-title"
                        disabled={!canEditSong}
                        placeholder="Title"
                        value={title}
                        onChange={this.onTitleChange}
                    />
                    <span className="song-header-artist">
                        by{" "}
                        <EditableText
                            disabled={!canEditSong}
                            placeholder="Artist"
                            value={artist}
                            onChange={this.onArtistChange}
                        />
                    </span>
                </div>
            </div>
        );
    }

    private onArtistChange = (artist: string) => {
        updateSong(this.props, { artist });
    };

    private onTitleChange = (title: string) => {
        updateSong(this.props, { title });
    };
}

function mapStateToProps(state: IAppState, ownProps: ISongHeaderOwnProps): ISongHeaderStateProps {
    const { id } = ownProps;
    return {
        song: selectSong(state, id),
        canEditSong: selectCanEditSong(state, id),
    };
}

function mapDispatchToProps(_dispatch: Dispatch, _ownProps: ISongHeaderOwnProps): ISongHeaderDispatchProps {
    return {};
}

export const SongHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UnconnectedSongHeader);
