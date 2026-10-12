package com.klu.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.Cache;
import org.springframework.cache.interceptor.CacheErrorHandler;

public class RedisCacheErrorHandler implements CacheErrorHandler {

    private static final Logger logger = LoggerFactory.getLogger(RedisCacheErrorHandler.class);

    @Override
    public void handleCacheGetError(RuntimeException exception, Cache cache, Object key) {
        logger.warn("Redis cache GET failed for cache '{}' key '{}'. Falling back to PostgreSQL.",
                cache.getName(), key, exception);
    }

    @Override
    public void handleCachePutError(RuntimeException exception, Cache cache, Object key, Object value) {
        logger.warn("Redis cache PUT failed for cache '{}' key '{}'. Continuing with PostgreSQL.",
                cache.getName(), key, exception);
    }

    @Override
    public void handleCacheEvictError(RuntimeException exception, Cache cache, Object key) {
        logger.warn("Redis cache EVICT failed for cache '{}' key '{}'. PostgreSQL data is unchanged.",
                cache.getName(), key, exception);
    }

    @Override
    public void handleCacheClearError(RuntimeException exception, Cache cache) {
        logger.warn("Redis cache CLEAR failed for cache '{}'. PostgreSQL data is unchanged.",
                cache.getName(), exception);
    }
}
