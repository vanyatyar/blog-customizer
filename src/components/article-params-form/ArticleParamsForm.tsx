import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
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

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onClose: () => void;
	currentStyle: ArticleStateType;
	onApply: (style: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onClose,
	currentStyle,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	// Локальное состояние формы
	const [formState, setFormState] = useState<ArticleStateType>(currentStyle);

	// Ref для aside элемента
	const asideRef = useRef<HTMLDivElement>(null);

	// Инициализация формы при открытии
	useEffect(() => {
		if (isOpen) {
			setFormState(currentStyle);
		}
	}, [isOpen, currentStyle]);

	// Обработчик закрытия по клику вне формы
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

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
		onClose();
	};

	// Обработчик Reset (Сбросить)
	const handleResetClick = () => {
		const resetState = defaultArticleState;
		setFormState(resetState);
		onReset();
		onClose();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClose} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={asideRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.formContent}>
						{/* Шрифт */}
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleFontFamilyChange}
							placeholder='Выберите шрифт'
						/>

						<Separator />

						{/* Размер шрифта */}
						<RadioGroup
							title='Размер шрифта'
							name='font-size'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>

						<Separator />

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

						<Separator />

						{/* Ширина контента */}
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handleContentWidthChange}
							placeholder='Выберите ширину'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleResetClick}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
