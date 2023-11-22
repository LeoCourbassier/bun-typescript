# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /app

COPY . .
RUN bun install --frozen-lockfile

ENV NODE_ENV=development
ENV PORT=1234
USER bun
EXPOSE 1234/tcp
ENTRYPOINT [ "bun", "run", "start" ]
