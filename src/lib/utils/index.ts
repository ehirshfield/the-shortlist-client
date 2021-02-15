import { message, notification } from 'antd';

export const displaySuccessNotification = (
	message: string,
	description?: string
) => {
	return notification['success']({
		message,
		description,
		placement: 'topLeft',
		style: {
			marginTop: 50,
		},
	});
};

export const displayErrorMessage = (error: string) => {
	return message.error(error);
};

export const iconColor = '#1890ff';

export const capitalizeFirstLetter = (input: string) => {
	return (
		input.charAt(0).toLocaleUpperCase() +
		input.substring(1).toLocaleLowerCase()
	);
};
