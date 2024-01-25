import React, { useState } from 'react';
import './App.css';

function New(props) {
	return (
		<div className="wrap-item wrap-item-new">
			<span className="label">New!</span>
			{props.children}
		</div>
	)
};

function Popular(props) {
	return (
		<div className="wrap-item wrap-item-popular">
			<span className="label">Popular!</span>
			{props.children}
		</div>
	)
};

function Article(props) {
	return (
		<div className="item item-article">
			<h3><a href="#">{props.title}</a></h3>
			<p className="views">Прочтений: {props.views}</p>
		</div>
	)
};

function Video(props) {
	return (
		<div className="item item-video">
			<iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
			<p className="views">Просмотров: {props.views}</p>
		</div>
	)
};

function sortByViews(Component) {
	return class extends React.Component {
		render() {
			if (this.props.views > 1000) {
				return (
					<Popular>
						<Component {...this.props} />
					</Popular>
				)
			}

			if (this.props.views < 100) {
				return (
					<New>
						<Component {...this.props} />
					</New>
				)
			}

		}
	}
}

let PopularVideo = sortByViews(Video);
let PopularArticle = sortByViews(Article)

function List(props) {
	return props.list.map(item => {
		switch (item.type) {
			case 'video':
				return (
					<PopularVideo {...item} />
				);

			case 'article':
				return (
					<PopularArticle {...item} />
				);
			default:
				return null;
		}
	});
};

export default function App() {
	const [list] = useState([
		{
			type: 'video',
			url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
			views: 50
		},
		{
			type: 'video',
			url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
			views: 12
		},
		{
			type: 'article',
			title: 'Невероятные события в неизвестном поселке...',
			views: 175
		},
		{
			type: 'article',
			title: 'Секретные данные были раскрыты!',
			views: 1532
		},
		{
			type: 'video',
			url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
			views: 4253
		},
		{
			type: 'article',
			title: 'Кот Бегемот обладает невероятной...',
			views: 12,
		},
	]);

	return (
		<List list={list} />
	);
}