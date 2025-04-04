import * as log4js from '@log4js-node/log4js-api';
import * as path from 'path';
import type { BotProxy } from './bot-proxy.interface.ts';
import type { MessageContext } from './message-context.interface.ts';

let mBot: BotProxy;
let logger: log4js.Logger;

export const init = async (bot: BotProxy, options: { [key: string]: any }): Promise<void> => {
    mBot = bot;
    logger = options.logger || console;
    const { default: metadata } = await import(path.resolve(import.meta.dirname, 'package.json'), { with: { type: "json" } });

    logger.info(`${metadata.name} plugin v${metadata.version} has been initialized.`);
};

export const onStart = () => {
    logger.debug('onStart()');
};

export const onStop = () => {
    logger.debug('onStop()');
};

export const onMessage = async (message: string, context: MessageContext, data: { [key: string]: any }) => {
    // ignore bot talk
    if ( context.userId == undefined ) {
      return
    }

    const prefix = process.env.REC0_ENV_HEART_PREFIX || 'heart';
    if ( prefix != message.split(' ')[0] ) {
        return;
    }

    const username = process.env.REC0_ENV_HEART_BOT_USERNAME || 'heart';
    const icon_emoji = process.env.REC0_ENV_HEART_BOT_ICON_EMOJI || ':heart:';
    var options = { username: username, icon_emoji: icon_emoji};

    const trimmed_message  = message.split(' ').slice(1).join(' ')
    const hearted_message  = trimmed_message.replace(/ /g,`:heart:`).replace(/\r?\n/g,`:heart:\n`) + ':heart:'

    await mBot.sendTalk(await mBot.getChannelId(process.env.REC0_ENV_HEART_CHANNEL || 'heart'),
        `${hearted_message}`, options);
};

export const onPluginEvent = (eventName: string, value?: any, fromId?: string) => {
    // Nop
};
