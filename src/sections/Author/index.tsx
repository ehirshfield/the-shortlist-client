import React, { useState, Fragment } from 'react';
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
	LoadingOutlined,
	PlusOutlined,
	MinusCircleOutlined,
	ShopOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import { Viewer } from '../../lib/types';
import { ADD_REVIEW } from '../../lib/graphql/mutations';
import {
	AddReview as AddReviewData,
	AddReviewVariables,
} from '../../lib/graphql/mutations/AddReview/__generated__/AddReview';
import { ReviewType } from '../../lib/graphql/globalTypes';
import { Link, Redirect } from 'react-router-dom';
import { useScrollToTop } from '../../lib/hooks';
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
const { Item, List } = Form;

export const Author = ({ viewer }: Props) => {
	const [form] = Form.useForm();
	const [imageLoading, setImageLoading] = useState(false);
	const [imageBase64Value, setImageBase64Value] = useState<string | null>(
		null
	);
	const [reviewType, setReviewType] = useState(ReviewType.RECIPE);

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

	useScrollToTop();

	const handleImageUpload = (info: UploadChangeParam) => {
		const { file } = info;
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
		let input;
		if (values.address) {
			const fullAddress = `${values.address}, ${values.city}, ${values.state}, ${values.zipcode}`;

			input = {
				...values,
				address: fullAddress,
				image: imageBase64Value,
			};
			delete input.city;
			delete input.state;
			delete input.zipcode;
		} else {
			input = {
				...values,
				image: imageBase64Value,
			};
		}

		addReview({
			variables: {
				input,
			},
		});
	};

	const renderRestaurantInputs = () => {
		return (
			<Fragment>
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
			</Fragment>
		);
	};

	const renderRecipeInputs = () => {
		return (
			<Fragment>
				<Item
					name='url'
					label='Website URL'
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input placeholder='www.seriouseats.com/yummy-thing' />
				</Item>
			</Fragment>
		);
	};

	const renderTypeInputs = (type: ReviewType) => {
		if (type === ReviewType.RECIPE) {
			return renderRecipeInputs();
		} else if (type === ReviewType.RESTAURANT) {
			return renderRestaurantInputs();
		} else if (type === ReviewType.PRODUCT) {
			return null;
		}
	};

	const renderHighlightsInputs = () => {
		return (
			<Item
				label='Highlights'
				rules={[
					{
						required: true,
					},
				]}
			>
				<List
					name='highlights'
					rules={[
						{
							validator: async (_, highlights) => {
								if (!highlights || highlights.length < 1) {
									return Promise.reject(
										new Error('Add at least 1 highlight!')
									);
								}
							},
						},
					]}
				>
					{(fields, { add, remove }, { errors }) => (
						<>
							{fields.map((field, index) => (
								<Item
									label={index === 0 ? '' : ''}
									required={false}
									key={field.key}
								>
									<Item
										{...field}
										validateTrigger={['onChange', 'onBlur']}
										rules={[
											{
												required: true,
												whitespace: true,
												message:
													'Please input a highlight or delete this field.',
											},
										]}
										noStyle
									>
										<Input
											placeholder='A fun highlight!'
											style={{ width: '85%' }}
										/>
									</Item>
									{fields.length > 1 ? (
										<MinusCircleOutlined
											className='dynamic-delete-button'
											onClick={() => remove(field.name)}
										/>
									) : null}
								</Item>
							))}
							<Item>
								<Button
									type='dashed'
									onClick={() => add()}
									style={{ width: '60%' }}
									icon={<PlusOutlined />}
								>
									Add a highlight
								</Button>
								<Form.ErrorList errors={errors} />
							</Item>
						</>
					)}
				</List>
			</Item>
		);
	};

	const renderLowlightsInputs = () => {
		return (
			<Item
				label='Lowlights'
				rules={[
					{
						required: true,
					},
				]}
			>
				<List
					name='lowlights'
					rules={[
						{
							validator: async (_, lowlights) => {
								if (!lowlights || lowlights.length < 1) {
									return Promise.reject(
										new Error('Add at least 1 lowlight!')
									);
								}
							},
						},
					]}
				>
					{(fields, { add, remove }, { errors }) => (
						<>
							{fields.map((field, index) => (
								<Item
									label={index === 0 ? '' : ''}
									required={false}
									key={field.key}
								>
									<Item
										{...field}
										validateTrigger={['onChange', 'onBlur']}
										rules={[
											{
												required: true,
												whitespace: true,
												message:
													'Please input a lowlight or delete this field.',
											},
										]}
										noStyle
									>
										<Input
											placeholder='A sad lowlight!'
											style={{ width: '85%' }}
										/>
									</Item>
									{fields.length > 1 ? (
										<MinusCircleOutlined
											className='dynamic-delete-button'
											onClick={() => remove(field.name)}
										/>
									) : null}
								</Item>
							))}
							<Item>
								<Button
									type='dashed'
									onClick={() => add()}
									style={{ width: '60%' }}
									icon={<PlusOutlined />}
								>
									Add a lowlight
								</Button>
								<Form.ErrorList errors={errors} />
							</Item>
						</>
					)}
				</List>
			</Item>
		);
	};

	if (!viewer.id) {
		return (
			<Content className='host-content'>
				<div className='host__form-header'>
					<Title level={3} className='host__form-title'>
						You need to be signed in to write reviews
					</Title>
					<Text type='secondary'>
						Only authorized users are allowed to write reviews. You
						can sign in at the <Link to='/login'>login page</Link>
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
			<Form
				layout='vertical'
				form={form}
				onFinish={onFinish}
				initialValues={{
					// eslint-disable-next-line
					['type']: reviewType,
				}}
			>
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
					<Radio.Group
						onChange={(e) => setReviewType(e.target.value)}
					>
						<Radio.Button value={ReviewType.RECIPE}>
							<BookOutlined style={{ color: iconColor }} />
							<span> Recipe</span>
						</Radio.Button>
						<Radio.Button value={ReviewType.RESTAURANT}>
							<ShopOutlined style={{ color: iconColor }} />
							<span> Restaurant</span>
						</Radio.Button>
						<Radio.Button value={ReviewType.PRODUCT}>
							<ShoppingCartOutlined
								style={{ color: iconColor }}
							/>
							<span> Product</span>
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
					name='subtitle'
					label='Subtitle'
					extra='Max character count of 200'
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input
						maxLength={200}
						placeholder='Will he order the Filet-o-Fish?'
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

				{renderTypeInputs(reviewType)}

				{renderHighlightsInputs()}

				{renderLowlightsInputs()}

				<Item
					name='image'
					label='Image'
					extra='Images have to be under 5MB in size and of type JPG or PNG'
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
					name='video'
					label='Video Link'
					extra='The embed link from YouTube'
				>
					<Input placeholder='https://www.youtube.com/embed/fZHBuNizY0Q' />
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

	const fileIsValidSize = file.size / 1024 / 1024 < 5;

	if (!fileIsValidImage) {
		displayErrorMessage('Only able to upload jpeg and png files');
		return false;
	}
	if (!fileIsValidSize) {
		displayErrorMessage('Only allowed to upload images < 5MB in size!');
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
