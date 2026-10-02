import { CulturalTemplate, TemplateId } from '../../types/wedding';
import { bengaliTemplate } from './bengaliTemplate';
import { royalNorthTemplate } from './royalNorthTemplate';
import { southIndianTemplate } from './southIndianTemplate';
import { modernMinimalTemplate } from './modernMinimalTemplate';
import { bihariMarwariTemplate } from './bihariMarwariTemplate';
import { annaprashanTemplate } from './annaprashanTemplate';
import { birthdayTemplate } from './birthdayTemplate';
import { chibi3dTemplate } from './chibi3dTemplate';

export const templatesList: CulturalTemplate[] = [
  bengaliTemplate,
  bihariMarwariTemplate,
  chibi3dTemplate,
  annaprashanTemplate,
  birthdayTemplate,
  royalNorthTemplate,
  southIndianTemplate,
  modernMinimalTemplate,
];

export const templatesMap: Record<TemplateId, CulturalTemplate> = {
  bengali: bengaliTemplate,
  bihari_marwari: bihariMarwariTemplate,
  chibi_3d: chibi3dTemplate,
  annaprashan: annaprashanTemplate,
  birthday: birthdayTemplate,
  royal_north: royalNorthTemplate,
  south_indian: southIndianTemplate,
  modern_minimal: modernMinimalTemplate,
};

export const getTemplateById = (id: string | null): CulturalTemplate => {
  if (id && id in templatesMap) {
    return templatesMap[id as TemplateId];
  }
  return bengaliTemplate;
};

export {
  bengaliTemplate,
  bihariMarwariTemplate,
  chibi3dTemplate,
  annaprashanTemplate,
  birthdayTemplate,
  royalNorthTemplate,
  southIndianTemplate,
  modernMinimalTemplate,
};
