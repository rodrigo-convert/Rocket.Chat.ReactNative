import Model from '@nozbe/watermelondb/Model';
import { MarkdownAST } from '@rocket.chat/message-parser';

import { IAttachment } from './IAttachment';
import { IReaction } from './IReaction';
import { IUrlFromServer } from './IUrl';

export type MessageType = 'jitsi_call_started' | 'discussion-created' | 'e2e' | 'load_more' | 'rm' | 'uj';

export interface IUserMessage {
	_id: string;
	username?: string;
	name?: string;
}

export interface IUserMention extends IUserMessage {
	type: string;
}

export interface IUserChannel {
	[index: number]: string | number;
	name: string;
	_id: string;
}

export interface IEditedBy {
	_id: string;
	username: string;
}

export type TOnLinkPress = (link: string) => void;

export interface ITranslations {
	_id: string;
	language: string;
	value: string;
}

export type E2EType = 'pending' | 'done';

export interface ILastMessage {
	_id: string;
	rid: string;
	tshow: boolean;
	t: MessageType;
	tmid: string;
	msg: string;
	e2e: E2EType;
	ts: Date;
	u: IUserMessage;
	_updatedAt: Date;
	urls: string[];
	mentions: IUserMention[];
	channels: IUserChannel[];
	md: MarkdownAST;
	attachments: IAttachment[];
	reactions: IReaction[];
	unread: boolean;
	status: boolean;
}

interface IMessageFile {
	_id: string;
	name: string;
	type: string;
}

interface IMessageAttachment {
	ts: string;
	title: string;
	title_link: string;
	title_link_download: true;
	image_dimensions: {
		width: number;
		height: number;
	};
	image_preview: string;
	image_url: string;
	image_type: string;
	image_size: number;
	type: string;
	description: string;
}

export interface IMessageFromServer {
	_id: string;
	rid: string;
	msg: string;
	ts: string | Date; // wm date issue
	u: IUserMessage;
	_updatedAt: string | Date;
	urls: IUrlFromServer[];
	mentions: IUserMention[];
	channels: IUserChannel[];
	md: MarkdownAST;
	file: IMessageFile;
	files: IMessageFile[];
	groupable: false;
	attachments: IMessageAttachment[];
}

export interface ILoadMoreMessage {
	_id: string;
	rid: string;
	ts: string;
	t: string;
	msg: string;
}

export interface IMessage extends IMessageFromServer {
	id: string;
	t?: MessageType;
	alias?: string;
	parseUrls?: boolean;
	avatar?: string;
	emoji?: string;
	status?: number;
	pinned?: boolean;
	starred?: boolean;
	editedBy?: IEditedBy;
	reactions?: IReaction[];
	role?: string;
	drid?: string;
	dcount?: number;
	dlm?: string | Date;
	tmid?: string;
	tcount?: number;
	tlm?: string | Date;
	replies?: string[];
	unread?: boolean;
	autoTranslate?: boolean;
	translations?: ITranslations[];
	tmsg?: string;
	blocks?: any;
	e2e?: string;
	tshow?: boolean;
	subscription?: { id: string };
}

export type TMessageModel = IMessage & Model;

export type TTypeMessages = IMessageFromServer | ILoadMoreMessage | IMessage;
