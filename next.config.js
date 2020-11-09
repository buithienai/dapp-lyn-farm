const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css');
const withPlugins = require("next-compose-plugins");
const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

const plugins = [
    withCSS,
    withSass
];

module.exports = withPlugins(
    [...plugins],
    {
        webpack: (config, { dev, isServer }) => {
            const conf = config;
            conf.module.rules.push({
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            });

            conf.node = {
                fs: "empty"

            };

            conf.plugins.push(new webpack.EnvironmentPlugin(localEnv));

            return conf;
        },
        onDemandEntries: {
            maxInactiveAge: 60 * 60 * 1000,
            pagesBufferLength: 2
        }
    }
);