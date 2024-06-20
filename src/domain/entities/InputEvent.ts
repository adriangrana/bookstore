export interface InputEvent {
	event: string;
	action: 'LIST' | 'GET';
	code?: string;
}