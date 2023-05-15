import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { setLanguage, setTheme, selectLanguage, selectTheme } from 'src/app/slice/SettingsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function turnRightButton(el: Element) {
  el.classList.remove('left-[155px]');
  el.classList.add('left-1');
}

function turnLeftButton(el: Element) {
  el.classList.remove('left-1');
  el.classList.add('left-[155px]');
}

function SettingModal(): JSX.Element {
  const { t, i18n } = useTranslation();
  const languageFromStore = useAppSelector(selectLanguage);
  const themeFromStore = useAppSelector(selectTheme);
  const langRef = useRef<HTMLButtonElement>(null);
  const themeRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const langButton = langRef.current!;
    const themeButton = themeRef.current!;
    languageFromStore === 'en' ? turnRightButton(langButton) : turnLeftButton(langButton);
    themeFromStore === 'light' ? turnRightButton(themeButton) : turnLeftButton(themeButton);
  });

  const switchTranslationEl = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.target as Element;
    if (el.classList.contains('left-[155px]')) {
      turnRightButton(el);
      dispatch(setLanguage('en'));
      i18n.changeLanguage('en');
    } else {
      turnLeftButton(el);
      dispatch(setLanguage('ru'));
      i18n.changeLanguage('ru');
    }
  };

  const switchThemeEl = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.target as Element;
    if (el.classList.contains('left-[155px]')) {
      turnRightButton(el);
      dispatch(setTheme('light'));
      document.body.classList.remove('dark');
    } else {
      turnLeftButton(el);
      dispatch(setTheme('dark'));
      document.body.classList.add('dark');
    }
  };

  return (
    <div className="setting-modal border-[1px] border-base_green_light shadow-xl p-4 pb-8 w-full rounded-md bg-base_white">
      <h1 className="title text-2xl text-center font-normal text-base_green">
        {t('Setting.Title')}
      </h1>
      <div className="setting__options flex flex-col">
        <div className="setting__item language">
          <div className="mx-8 shadow rounded-full h-10 mt-4 flex p-1 relative items-center">
            <div className="w-[155px] flex justify-center">
              <button type="button">RU</button>
            </div>
            <div className="w-[155px] flex justify-center">
              <button type="button">EN</button>
            </div>
            <button
              className="elSwitchLang bg-base_green_light shadow text-white flex items-center justify-center w-[155px]  rounded-full h-8 transition-all top-[4px] absolute left-1"
              type="button"
              ref={langRef}
              onClick={(e) => {
                switchTranslationEl(e);
              }}
            >
              {t('Setting.Language')}
            </button>
          </div>
        </div>
        <div className="setting__item theme">
          <div className="mx-8 shadow rounded-full h-10 mt-4 flex p-1 relative items-center">
            <div className="w-[155px] flex justify-center">
              <button type="button">{t('Setting.Dark')}</button>
            </div>
            <div className="w-[155px] flex justify-center">
              <button type="button">{t('Setting.Light')}</button>
            </div>
            <button
              className="elSwitchTheme bg-base_green_light shadow text-white flex items-center justify-center w-[155px]  rounded-full h-8 transition-all top-[4px] absolute left-1"
              type="button"
              ref={themeRef}
              onClick={(e) => {
                switchThemeEl(e);
              }}
            >
              {t('Setting.Theme')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingModal;
