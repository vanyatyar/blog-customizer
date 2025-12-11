import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	fontColors,
	backgroundColors,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { useClose } from 'src/hooks/useClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentStyle: ArticleStateType;
	onApply: (style: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	currentStyle,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentStyle);

	const asideRef = useRef<HTMLElement>(null);

	useClose({
		isOpen,
		onClose: () => setIsOpen(false),
		rootRef: asideRef,
	});

	// Инициализация формы при открытии
	useEffect(() => {
		if (isOpen) {
			setFormState(currentStyle);
		}
	}, [isOpen, currentStyle]);

	// Обработчики изменения полей формы
	const handleFontFamilyChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontSizeChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: option }));
	};

	const handleFontColorChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, fontColor: option }));
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (option: OptionType) => {
		setFormState((prev) => ({ ...prev, contentWidth: option }));
	};

	// Обработчик Submit (Применить)
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	// Обработчик Reset (Сбросить)
	const handleResetForm = (e: React.FormEvent) => {
		e.preventDefault();
		const resetState = defaultArticleState;
		setFormState(resetState);
		onReset();
		setIsOpen(false);
	};

	// Обработчик открытия/закрытия через кнопку
	const handleArrowButtonClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowButtonClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetForm}>
					<Text as='h2' size={31} weight={800} uppercase align='center'>
						Задайте параметры
					</Text>

					{/* Шрифт */}
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleFontFamilyChange}
						placeholder='Выберите шрифт'
					/>

					{/* Размер шрифта */}
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
					/>

					{/* Цвет текста */}
					<Select
						title='Цвет текста'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleFontColorChange}
						placeholder='Выберите цвет текста'
					/>

					<Separator />

					{/* Цвет фона */}
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleBackgroundColorChange}
						placeholder='Выберите цвет фона'
					/>

					{/* Ширина контента */}
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleContentWidthChange}
						placeholder='Выберите ширину'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
