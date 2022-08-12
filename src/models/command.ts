interface RunArgs {
    script: string;
    site: string;
}

interface RunOptions {
    env: string;
    worker: string
}

interface CommandResponse {
    status: string;
    message?: string;
}