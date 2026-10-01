import { CulturalTemplate, TemplateId } from '../../types/wedding';
import { bengaliTemplate } from './bengaliTemplate';
import { royalNorthTemplate } from './royalNorthTemplate';
import { southIndianTemplate } from './southIndianTemplate';
import { modernMinimalTemplate } from './modernMinimalTemplate';
import { bihariMarwariTemplate } from './bihariMarwariTemplate';

export const templatesList: CulturalTemplate[] = [
  bengaliTemplate,
  bihariMarwariTemplate,
  royalNorthTemplate,
  southIndianTemplate,
  modernMinimalTemplate,
];

export const templatesMap: Record<TemplateId, CulturalTemplate> = {
  bengali: bengaliTemplate,
  bihari_marwari: bihariMarwariTemplate,
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
  royalNorthTemplate,
  southIndianTemplate,
  modernMinimalTemplate,
};
