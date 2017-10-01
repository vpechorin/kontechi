import path from 'path';

const config = {
    env: process.env.NODE_ENV || 'development',
    path_base: path.resolve(__dirname, '..'),
    dir_src: 'src',
    dir_dist: 'dist',
    dir_server: 'server',
    server_host: process.env.HOST || 'localhost',
    server_port: process.env.PORT || 3000,

    compiler_css_modules: true,
    compiler_devtool: 'cheap-source-maps',
    compiler_hash_type: 'hash',
    compiler_fail_on_warning: false,
    compiler_quiet: false,
    compiler_public_path: '/',
    compiler_stats: {
        chunks: false,
        chunkModules: false,
        colors: true
    }

};

export default config;