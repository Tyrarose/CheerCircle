// utils/imageCache.ts

/**
 * Caches an image in localStorage for a specific quiz part and key
 * @param partId The ID of the quiz part
 * @param key The key for the image
 * @param file The file to cache
 */
export const cacheImageFile = (partId: string, key: string, file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        const dataUrl = reader.result as string;
        localStorage.setItem(`${partId}_image_${key}`, dataUrl);
        resolve(dataUrl);
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  /**
   * Gets a cached image from localStorage
   * @param partId The ID of the quiz part
   * @param key The key for the image
   * @param defaultImage Optional default image to return if no cached image is found
   */
  export const getCachedImage = (partId: string, key: string, defaultImage?: string): string => {
    const cachedImage = localStorage.getItem(`${partId}_image_${key}`);
    if (cachedImage && cachedImage.trim() !== "") {
      return cachedImage;
    }
    return defaultImage || '';
  };
  
  /**
   * Clears all cached images for a specific quiz part
   * @param partId The ID of the quiz part
   */
  export const clearCachedImages = (partId: string): void => {
    const keys = Object.keys(localStorage);
    const imageKeys = keys.filter(key => key.startsWith(`${partId}_image_`));
    
    imageKeys.forEach(key => {
      localStorage.removeItem(key);
    });
  };
  
  /**
   * Clears all cached images for all quiz parts
   */
  export const clearAllCachedImages = (): void => {
    const keys = Object.keys(localStorage);
    const imageKeys = keys.filter(key => key.includes('_image_'));
    
    imageKeys.forEach(key => {
      localStorage.removeItem(key);
    });
  };