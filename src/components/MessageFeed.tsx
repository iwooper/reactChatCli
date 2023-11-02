import * as React from 'react';
import { fetchMessages, Message } from '../client';
import { Dimmer, Loader, Segment, Image, Comment, Header } from 'semantic-ui-react';
import Axios, { CancelTokenSource } from 'axios';

interface MessageFeedProps {
    channelName: string;
	shouldReload: boolean,
	setShouldReload: (shouldReload: boolean) => void;
}

interface MessageFeedState {
    messages?: Message[];
	isLoading?: boolean;
}

export class MessageFeed extends React.Component<MessageFeedProps, MessageFeedState> {

	private cancelTokenSource: CancelTokenSource

    constructor(props: MessageFeedProps) {
        super(props);
        this.state = {
            messages: [],
			isLoading: false,
        }
		this.cancelTokenSource = null
    }

	private fetchMessages = (channelName: string) => {
		// this.props.setShouldReload(false)	// reset

		this.setState({ isLoading: true })

		// cancelToken 생성
		this.cancelTokenSource = Axios.CancelToken.source()

        fetchMessages(channelName, {}, this.cancelTokenSource.token)
            .then(response => {
                this.setState({
                    messages: response.data.messages,
					isLoading: false,
				});
            }).catch(err => {
				if (Axios.isCancel(err)) {
					// 컴포넌트가 unmount인 경우
					console.log(err);
				} else {
					// 일반적인 오류
					console.log(err);
					this.setState({
						isLoading: false,
					})
				}
            });
    }

	// 컴포넌트가 언마운트인 경우 비동기 처리를 취소
	public componentWillUnmount(): void {
		if (this.cancelTokenSource) {
			this.cancelTokenSource.cancel('This component has been unmounted');
		}
	}

	public componentDidMount() {
    	this.fetchMessages(this.props.channelName);
    }

	public componentDidUpdate(prevProps: MessageFeedProps) {
        if (prevProps.channelName !== this.props.channelName ||
			!prevProps.shouldReload && this.props.shouldReload
			) {
			if (!prevProps.shouldReload && this.props.shouldReload) {
				this.props.setShouldReload(false)	// reset
			}
            this.fetchMessages(this.props.channelName);
        }
    }

    public render() {
		if (this.state.isLoading) {
			return (
				<Dimmer active>
					<Loader />
				</Dimmer>
			)
		}
        return (
			<Segment basic>
				<Comment.Group>
					<Header as='h3' dividing>{this.props.channelName}</Header>
					{this.state.messages.slice().reverse().map(message => {
						return (
							<Comment key={message.id}>
								<Comment.Avatar src={message.user.avatar || '/img/avatar.png'} />
								<Comment.Content>
									<Comment.Author as='a'>@{message.user.name}</Comment.Author>
									<Comment.Metadata>
										<div>{message.date}</div>
									</Comment.Metadata>
									<Comment.Text>
										{message.body}
									</Comment.Text>
								</Comment.Content>
							</Comment>
						);
					})}
				</Comment.Group>
			</Segment>
        );
    }
}
