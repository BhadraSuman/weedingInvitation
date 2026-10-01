import { CulturalTemplate, TemplateId } from '../../types/wedding';
import { bengaliTemplate } from './bengaliTemplate';
import { royalNorthTemplate } from './royalNorthTemplate';
import { southIndianTemplate } from './southIndianTemplate';
import { modernMinimalTemplate } from './modernMinimalTemplate';

export const templatesList: CulturalTemplate[] = [
  bengaliTemplate,
  royalNorthTemplate,
  southIndianTemplate,
  modernMinimalTemplate,
];

export const templatesMap: Record<TemplateId, CulturalTemplate> = {
  bengali: bengaliTemplate,
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
  royalNorthTemplate,
  southIndianTemplate,
  modernMinimalTemplate,
};
