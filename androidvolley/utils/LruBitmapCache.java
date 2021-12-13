package com.example.sumon.androidvolley.utils;

import com.android.volley.toolbox.ImageLoader.ImageCache;

import android.graphics.Bitmap;
import android.support.v4.util.LruCache;

/**
 * The type Lru bitmap cache.
 */
public class LruBitmapCache extends LruCache<String, Bitmap> implements ImageCache {
	/**
	 * Gets default lru cache size.
	 *
	 * @return the default lru cache size
	 */
	public static int getDefaultLruCacheSize() {
		final int maxMemory = (int) (Runtime.getRuntime().maxMemory() / 1024);
		final int cacheSize = maxMemory / 8;

		return cacheSize;
	}

	/**
	 * Instantiates a new Lru bitmap cache.
	 */
	public LruBitmapCache() {
		this(getDefaultLruCacheSize());
	}

	/**
	 * Instantiates a new Lru bitmap cache.
	 *
	 * @param sizeInKiloBytes the size in kilo bytes
	 */
	public LruBitmapCache(int sizeInKiloBytes) {
		super(sizeInKiloBytes);
	}

	@Override
	protected int sizeOf(String key, Bitmap value) {
		return value.getRowBytes() * value.getHeight() / 1024;
	}

	@Override
	public Bitmap getBitmap(String url) {
		return get(url);
	}

	@Override
	public void putBitmap(String url, Bitmap bitmap) {
		put(url, bitmap);
	}
}