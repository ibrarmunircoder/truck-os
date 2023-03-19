// eslint-disable-next-line @roq/filename-suffix-mismatch
import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import * as _ from 'lodash';
import { join } from 'path';
import { DateScalar, JsonObjectScalar } from 'src/library/scalars';

/**
  * Traverse through folders and sub folders of currentDirectoryPath recursively
  * to find the resolvers folder and then return the list of resolvers folders paths
  *
  * @param {string} folderPathToTraverse
  * @param {string[]} filenames
  * @returns {string[]}
  */
const traverseThroughFolders = (
  folderPathToTraverse: string,
  filenames: string[]
): string[] => {
  let arr = [];
  filenames.forEach((file) => {
    const filePath = `${join(folderPathToTraverse)}/${file}`;
    const isDirectory = statSync(filePath).isDirectory();
    if (isDirectory) {
      //check if folder is resolver folder
      if (filePath.includes('resolvers')) {
        arr = arr.concat(`${filePath}/index.ts`);
      } else {
        //get all the files/folder inside the directory
        const files = readdirSync(filePath);
        arr = arr.concat(traverseThroughFolders(filePath, files));
      }
    }
  });
  return arr;
};

const createSchema = async () => {
  //pass current path as folder path to traverse
  const sourceDirectory = join(__dirname, '../../');
  const resolversPaths = traverseThroughFolders(sourceDirectory, readdirSync(sourceDirectory));
  //dynamic imports and resolve the resolvers modules
  const imports = resolversPaths.map((path) => import(path));
  const resolvers = [];
  await Promise.all(imports).then((importResult) => {
    _.forEach(importResult, (resolverObject) => {
      _.forEach(Object.keys(resolverObject), (resolver) => resolvers.push(resolverObject[resolver]));
    });
  });

  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();
  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create(resolvers, [JsonObjectScalar, DateScalar]);
  writeFileSync(join(process.cwd(), '/src/schema.gql'), printSchema(schema));
};

void createSchema();
