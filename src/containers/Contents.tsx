import * as React from 'react';
import { match } from 'react-router-dom';
import { MessageFeed, MessageForm } from '..';

interface ChannelMatch {
    channelName: string;
}

interface ChannelProps {
    match: match<ChannelMatch>;
}

interface ChannelState {
	shouldReload: boolean
}

export class Contents extends React.Component<ChannelProps, ChannelState> {

    constructor(props: ChannelProps) {
        super(props)
		this.state = {
			shouldReload: false
		}
    }

	private setShouldReload = (shouldReload: boolean) => {
		this.setState({ shouldReload })
	}
    
    public render() {
        const { channelName } = this.props.match.params;
        return (
            [
                <MessageFeed key="message-feed"
					shouldReload={this.state.shouldReload}
					setShouldReload={this.setShouldReload}
					channelName={channelName} />,
				<MessageForm key="message-form"
					setShouldReload={this.setShouldReload}
					channelName={channelName} />
            ]
        );
    }
}