import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
	Layout,
	Typography,
	Form,
	Input,
	InputNumber,
	Radio,
	Upload,
	Button,
} from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import {
	BookOutlined,
	BankOutlined,
	LoadingOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { Viewer } from '../../lib/types';
import { ADD_REVIEW } from '../../lib/graphql/mutations';
import {
	AddReview as AddReviewData,
	AddReviewVariables,
} from '../../lib/graphql/mutations/AddReview/__generated__/AddReview';
import { ReviewType } from '../../lib/graphql/globalTypes';
import { Link, Redirect } from 'react-router-dom';
import {
	displayErrorMessage,
	iconColor,
	displaySuccessNotification,
} from '../../lib/utils';

interface Props {
	viewer: Viewer;
}

const { Content } = Layout;
const { Text, Title } = Typography;
const { Item } = Form;

export const Author = ({ viewer }: Props) => {
	const [form] = Form.useForm();
	const [imageLoading, setImageLoading] = useState(false);
	const [imageBase64Value, setImageBase64Value] = useState<string | null>(
		null
	);

	const [addReview, { loading, data }] = useMutation<
		AddReviewData,
		AddReviewVariables
	>(ADD_REVIEW, {
		onCompleted: () => {
			displaySuccessNotification(
				"You've successfully created your review!"
			);
		},
		onError: () => {
			displayErrorMessage(
				"Sorry! We weren't able to create your review, please try again later!"
			);
		},
	});

	const handleImageUpload = (info: UploadChangeParam) => {
		const { file } = info;
		console.log('file :>> ', file);
		if (file.status === 'uploading') {
			setImageLoading(true);
			return;
		}
		if (file.status === 'done' && file.originFileObj) {
			getBase64Value(file.originFileObj, (imageBase64Value) => {
				setImageBase64Value(imageBase64Value);
				setImageLoading(false);
			});
		}
	};

	const onFinish = (values: any) => {
		const fullAddress = `${values.address}, ${values.city}, ${values.state}, ${values.zipcode}`;

		const input = {
			...values,
			address: fullAddress,
			image: imageBase64Value,
		};
		delete input.city;
		delete input.state;
		delete input.zipcode;

		console.log(input);

		addReview({
			variables: {
				input,
			},
		});
	};

	if (!viewer.id) {
		return (
			<Content className='host-content'>
				<div className='host__form-header'>
					<Title level={3} className='host__form-title'>
						You need to be signed in to write reviews
					</Title>
					<Text type='secondary'>
						Only certain usera are allowed to write reviews. You can
						sign in at the <Link to='/login'>login page</Link>
					</Text>
				</div>
			</Content>
		);
	}

	if (loading) {
		return (
			<Content className='host-content'>
				<div className='host__form-header'>
					<Title level={3} className='host__form-title'>
						Please wait!
					</Title>
					<Text type='secondary'>
						We're creating your listing now.
					</Text>
				</div>
			</Content>
		);
	}

	if (data && data.addReview) {
		return <Redirect to={`/review/${data.addReview.id}`} />;
	}

	return (
		<Content className='host-content'>
			<Form layout='vertical' form={form} onFinish={onFinish}>
				<div className='host__form-header'>
					<Title level={3} className='host__form-title'>
						Fill out your review here!
					</Title>
					<Text type='secondary'>
						Some basic information about the review
					</Text>
				</div>

				<Item
					name='type'
					label='Review Type'
					rules={[
						{
							required: true,
						},
					]}
				>
					<Radio.Group>
						<Radio.Button value={ReviewType.RECIPE}>
							<BookOutlined style={{ color: iconColor }} />
							<span>Recipe</span>
						</Radio.Button>
						<Radio.Button value={ReviewType.RESTAURANT}>
							<BankOutlined style={{ color: iconColor }} />
							<span>Restaurant</span>
						</Radio.Button>
					</Radio.Group>
				</Item>

				<Item
					name='title'
					label='Title'
					extra='Max character count of 100'
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input
						maxLength={100}
						placeholder='Tom goes to McDonalds again'
					/>
				</Item>
				<Item
					name='body'
					label='Body'
					extra='Max character count of 9000'
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input.TextArea
						rows={5}
						maxLength={9000}
						placeholder='I liked it, like a lot. A lot, a lot!'
					/>
				</Item>
				<Item
					name='address'
					label='Address'
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input placeholder='123 Fake Street' />
				</Item>
				<Item
					name='city'
					label='City/Town'
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input placeholder='Santa Barbara' />
				</Item>
				<Item
					name='state'
					label='State/Province'
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input placeholder='California' />
				</Item>
				<Item
					name='zipcode'
					label='Zip/Postal Code'
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input placeholder='90210' />
				</Item>

				<Item
					name='image'
					label='Image'
					extra='Images have to be under 1MB in size and of type JPG or PNG'
					rules={[
						{
							required: true,
						},
					]}
				>
					<div className='host__form-image-upload'>
						<Upload
							name='image_upload'
							listType='picture-card'
							showUploadList={false}
							customRequest={dummyRequest}
							beforeUpload={beforeImageUpload}
							onChange={handleImageUpload}
						>
							{imageBase64Value ? (
								<img src={imageBase64Value} alt='Review' />
							) : (
								<div>
									{imageLoading ? (
										<LoadingOutlined />
									) : (
										<PlusOutlined />
									)}
									<div className='ant-upload-text'>
										Upload
									</div>
								</div>
							)}
						</Upload>
					</div>
				</Item>

				<Item
					name='rating'
					label='Overall Rating'
					rules={[
						{
							required: true,
						},
					]}
				>
					<InputNumber min={1} max={10} placeholder='1-10' />
				</Item>
				<Item>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Item>
			</Form>
		</Content>
	);
};

const beforeImageUpload = (file: File) => {
	const fileIsValidImage =
		file.type === 'image/jpeg' || file.type === 'image/png';

	const fileIsValidSize = file.size / 1024 / 1024 < 1;

	if (!fileIsValidImage) {
		displayErrorMessage('Only able to upload jpeg and png files');
		return false;
	}
	if (!fileIsValidSize) {
		displayErrorMessage('Only allowed to upload images < 1MB in size!');
		return false;
	}

	return fileIsValidImage && fileIsValidSize;
};

const getBase64Value = (
	img: File | Blob,
	callback: (imageBase64Value: string) => void
) => {
	const reader = new FileReader();
	reader.readAsDataURL(img);
	reader.onload = () => {
		callback(reader.result as string);
	};
};

const dummyRequest = ({ file, onSuccess }: any) => {
	setTimeout(() => {
		onSuccess('ok');
	}, 0);
};
