import { Logger } from '@log4js-node/log4js-api';
import * as path from 'path';
import { BotProxy } from './bot-proxy.interface';

let mBot: BotProxy;
let logger: Logger;
let metadata: {[key: string]: string};

export const init = async (bot: BotProxy, options: { [key: string]: any }): Promise<void> => {
    mBot = bot;
    logger = options.logger || console;
    metadata = await import(path.resolve(__dirname, 'package.json'));

    logger.info(`${metadata.name} plugin v${metadata.version} has been initialized.`);
};

export const onStart = () => {
    logger.debug('onStart()');
};

export const onStop = () => {
    logger.debug('onStop()');
};

export const onMessage = async (message: string, channelId: string, userId: string, data: { [key: string]: any }) => {
    await mBot.sendTalk(await mBot.getChannelId(process.env.REC0_ENV_SINDOI_CHANNEL || 'sindoi'),
        `しんどい……${message.split(' ').slice(1).join(' ')}`);
};

export const onPluginEvent = (eventName: string, value?: any, fromId?: string) => {
    // Nop
};
