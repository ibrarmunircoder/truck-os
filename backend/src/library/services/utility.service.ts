import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { FieldNode, GraphQLResolveInfo } from 'graphql';
import Handlebars from 'handlebars';
import { applicationConfig } from 'src/config';
import { DefaultLocaleUndefinedException } from 'src/library/exception';
import { JsonObject } from 'src/library/scalars';

export interface LocalizedDtoInterface {
  locales: LocalizationInterface[];
}

export interface LocalizationInterface {
  locale: string;
}

@Injectable()
export class UtilityService {
  constructor(
    @Inject(applicationConfig.KEY)
    private readonly appConfig: ConfigType<typeof applicationConfig>,
  ) {}

  public checkIfLocaleIsGiven(dto: LocalizedDtoInterface): void {
    const defaultLocale = this.appConfig.defaultLanguage;
    const locale = dto.locales.some((data) => data.locale === defaultLocale);
    if (!locale) {
      throw new DefaultLocaleUndefinedException({ variables: { defaultLocale } });
    }
  }

  public static compileHandleBarTemplate(content: string, contentVars: JsonObject): string {
    const template = Handlebars.compile(content);
    return template(contentVars);
  }

  public getInfoFields(info: GraphQLResolveInfo): string[] {
    const fields = ['id', 'createdAt', 'updatedAt', 'roqIdentifier'];
    const selections = info.fieldNodes[0].selectionSet?.selections;
    const dataSelection = selections.find((selection: FieldNode) => selection.name.value === 'data');
    if (dataSelection) {
      if ('selectionSet' in dataSelection) {
        dataSelection.selectionSet.selections.forEach((selection: FieldNode) => {
          if (!selection.selectionSet) {
            fields.push(`${selection.name.value}`);
          }
          if (
            selection.selectionSet &&
            !selection.selectionSet.selections.find((s: FieldNode) => s.name.value === 'data')
          ) {
            fields.push(`${selection.name.value}Id`);
          }
        });
      }
    } else {
      selections.forEach((selection: FieldNode) => {
        if (!selection.selectionSet) {
          fields.push(`${selection.name.value}`);
        }
        if (
          selection.selectionSet &&
          !selection.selectionSet.selections.find((s: FieldNode) => s.name.value === 'data')
        ) {
          fields.push(`${selection.name.value}Id`);
        }
      });
    }
    return fields;
  }
}
