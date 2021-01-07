import React from 'react';
import { Card, Col, Input, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

import losAngelesImage from '../../assets/los-angeles.jpg';
import sanFranImage from '../../assets/san-fran.jpg';
import newYorkImage from '../../assets/new-york.jpg';
import sanDiegoImage from '../../assets/san-diego.jpg';

const { Title } = Typography;
const { Search } = Input;

interface Props {
	onSearch: (value: string) => void;
}

export const HomeHero = ({ onSearch }: Props) => {
	return (
		<div className='home-hero'>
			<div className='home-hero__search'>
				<Title className='home-hero__title'>
					Search a city for a Shortlist
				</Title>
				<Search
					placeholder="Search 'San Francisco'"
					size='large'
					enterButton
					className='home-hero__search-input'
					onSearch={onSearch}
				/>
			</div>
			<Row gutter={12} className='home-hero__cards'>
				<Col xs={12} md={6}>
					<Link to='/reviews/los%20angeles'>
						<Card
							cover={
								<img alt='Los Angeles' src={losAngelesImage} />
							}
						>
							Los Angeles
						</Card>
					</Link>
				</Col>
				<Col xs={12} md={6}>
					<Link to='/reviews/san%20diego'>
						<Card
							cover={<img alt='San Diego' src={sanDiegoImage} />}
						>
							San Diego
						</Card>
					</Link>
				</Col>
				<Col xs={0} md={6}>
					<Link to='/reviews/new%20york'>
						<Card cover={<img alt='New York' src={newYorkImage} />}>
							New York
						</Card>
					</Link>
				</Col>
				<Col xs={0} md={6}>
					<Link to='/reviews/san%20francisco'>
						<Card
							cover={
								<img alt='San Francisco' src={sanFranImage} />
							}
						>
							San Francisco
						</Card>
					</Link>
				</Col>
			</Row>
		</div>
	);
};
