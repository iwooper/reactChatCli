import * as React from 'react'
import { postMessage, Message } from '../client'
import { Button, Form, Segment, TextArea } from 'semantic-ui-react'

interface MessageFormProps {
	channelName: string,
	setShouldReload: (shouldReload: boolean) => void
}

interface MessageFormState {
	body?: string;
}

export class MessageForm extends React.Component<MessageFormProps, MessageFormState> {
	constructor(props: MessageFormProps) {
		super(props)
		this.state = {
			body: ' '
		}
		this.onTextAreaChange = this.onTextAreaChange.bind(this)
		this.onFormSubmit = this.onFormSubmit.bind(this)
	}

	private onTextAreaChange(event: React.FormEvent<HTMLTextAreaElement>) {
		event.preventDefault()
		this.setState({ body: event.currentTarget.value })
	}

	private onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const payload = {
			body: this.state.body,
			user: {
				id: '123',
				name: 'imsi',
			}
		} as Message
		postMessage(this.props.channelName, payload)
		.then(() => {
			this.setState({body: ''})
			this.props.setShouldReload(true)
		})
		.catch(err => {
			console.log(err)
		})
	}

	public render() {
		return (
			<Segment basic textAlign='center'>
				<Form onSubmit={this.onFormSubmit}>
					<Form.Field>
						<TextArea
							autoHeight
							placeholder="Write your message"
							value={this.state.body}
							onChange={this.onTextAreaChange}
							/>
					</Form.Field>
					<Button primary type='submit'>Send</Button>
				</Form>
			</Segment>
		)
	}
}