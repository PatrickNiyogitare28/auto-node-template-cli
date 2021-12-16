import kleur from 'kleur';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
 return copy(options.templateDirectory, options.targetDirectory, {
   clobber: false,
 });
}

export async function createProject(options) {
 options = {
   ...options,
   targetDirectory: options.targetDirectory || process.cwd(),
 };

const templateDirUrl =  `${path.dirname(path.resolve(__dirname))}\\templates`
options.templateDirectory = `${templateDirUrl}\\${options.template.toLowerCase()}`;

 try {
   await access(templateDirUrl, fs.constants.R_OK);
 } catch (err) {
   console.error('%s Invalid template name', kleur.red().bold('ERROR'));
   console.log(err)
   process.exit(1);
 }

 console.log('Copy project files');
 await copyTemplateFiles(options);

 console.log('%s Project ready', kleur.green().bold('DONE'));
 return true;
}