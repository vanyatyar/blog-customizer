import { createRoot } from 'react-dom/client';
import { StrictMode, useState, useEffect, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// Функция для применения стилей (установки CSS-переменных)
	const applyStyles = (state: ArticleStateType) => {
		const root = document.documentElement;
		root.style.setProperty('--font-family', state.fontFamilyOption.value);
		root.style.setProperty('--font-size', state.fontSizeOption.value);
		root.style.setProperty('--font-color', state.fontColor.value);
		root.style.setProperty('--container-width', state.contentWidth.value);
		root.style.setProperty('--bg-color', state.backgroundColor.value);
	};

	// Применяем стили при изменении articleState
	useEffect(() => {
		applyStyles(articleState);
	}, [articleState]);

	const handleApply = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
	};

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				onClose={toggleOpen}
				currentStyle={articleState}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
