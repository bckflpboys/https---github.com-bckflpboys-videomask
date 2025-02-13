export interface DevicePreset {
  id: string;
  name: string;
  category: 'iPhone' | 'Samsung' | 'Xiaomi' | 'Huawei' | 'Desktop' | 'Browser';
  resolution: string;
  aspectRatio: string;
  frameRate: number;
  metadata: {
    make?: string;
    model?: string;
    software?: string;
  };
}

export const devicePresets: DevicePreset[] = [
  // iPhones
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    category: 'iPhone',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'Apple',
      model: 'iPhone 15 Pro',
      software: 'iOS 17.0',
    },
  },
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    category: 'iPhone',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'Apple',
      model: 'iPhone 14 Pro',
      software: 'iOS 16.0',
    },
  },
  {
    id: 'iphone-13-pro',
    name: 'iPhone 13 Pro',
    category: 'iPhone',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'Apple',
      model: 'iPhone 13 Pro',
      software: 'iOS 15.0',
    },
  },
  {
    id: 'iphone-12-pro',
    name: 'iPhone 12 Pro',
    category: 'iPhone',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'Apple',
      model: 'iPhone 12 Pro',
      software: 'iOS 14.0',
    },
  },
  {
    id: 'iphone-11-pro',
    name: 'iPhone 11 Pro',
    category: 'iPhone',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'Apple',
      model: 'iPhone 11 Pro',
      software: 'iOS 13.0',
    },
  },

  // Samsung
  {
    id: 'samsung-s23-ultra',
    name: 'Samsung Galaxy S23 Ultra',
    category: 'Samsung',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'Samsung',
      model: 'SM-S918',
      software: 'Android 13',
    },
  },
  {
    id: 'samsung-s22-ultra',
    name: 'Samsung Galaxy S22 Ultra',
    category: 'Samsung',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'Samsung',
      model: 'SM-S908',
      software: 'Android 12',
    },
  },
  {
    id: 'samsung-s21-ultra',
    name: 'Samsung Galaxy S21 Ultra',
    category: 'Samsung',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'Samsung',
      model: 'SM-G998',
      software: 'Android 11',
    },
  },
  {
    id: 'samsung-fold5',
    name: 'Samsung Galaxy Z Fold 5',
    category: 'Samsung',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'Samsung',
      model: 'SM-F946',
      software: 'Android 13',
    },
  },
  {
    id: 'samsung-flip5',
    name: 'Samsung Galaxy Z Flip 5',
    category: 'Samsung',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'Samsung',
      model: 'SM-F731',
      software: 'Android 13',
    },
  },

  // Xiaomi
  {
    id: 'xiaomi-13-pro',
    name: 'Xiaomi 13 Pro',
    category: 'Xiaomi',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'Xiaomi',
      model: '2210132C',
      software: 'MIUI 14',
    },
  },
  {
    id: 'xiaomi-12-pro',
    name: 'Xiaomi 12 Pro',
    category: 'Xiaomi',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'Xiaomi',
      model: '2201122C',
      software: 'MIUI 13',
    },
  },

  // Huawei
  {
    id: 'huawei-p60-pro',
    name: 'Huawei P60 Pro',
    category: 'Huawei',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'HUAWEI',
      model: 'P60 Pro',
      software: 'HarmonyOS 3.1',
    },
  },
  {
    id: 'huawei-mate50-pro',
    name: 'Huawei Mate 50 Pro',
    category: 'Huawei',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'HUAWEI',
      model: 'Mate 50 Pro',
      software: 'HarmonyOS 3.0',
    },
  },

  // Desktop/Laptop
  {
    id: 'macbook-pro',
    name: 'MacBook Pro',
    category: 'Desktop',
    resolution: '3840x2160',
    aspectRatio: '16:9',
    frameRate: 60,
    metadata: {
      make: 'Apple',
      model: 'MacBook Pro',
      software: 'macOS 14.0',
    },
  },
  {
    id: 'windows-laptop',
    name: 'Windows Laptop',
    category: 'Desktop',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    frameRate: 30,
    metadata: {
      make: 'Microsoft',
      model: 'Windows PC',
      software: 'Windows 11',
    },
  },

  // Browser Uploads
  {
    id: 'chrome-upload',
    name: 'Chrome Browser Upload',
    category: 'Browser',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    frameRate: 30,
    metadata: {
      software: 'Chrome 121.0',
    },
  },
  {
    id: 'safari-upload',
    name: 'Safari Browser Upload',
    category: 'Browser',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    frameRate: 30,
    metadata: {
      software: 'Safari 17.0',
    },
  },
  {
    id: 'firefox-upload',
    name: 'Firefox Browser Upload',
    category: 'Browser',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    frameRate: 30,
    metadata: {
      software: 'Firefox 122.0',
    },
  },
  {
    id: 'edge-upload',
    name: 'Edge Browser Upload',
    category: 'Browser',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    frameRate: 30,
    metadata: {
      software: 'Edge 121.0',
    },
  },
];

export const getPresetsByCategory = (category: DevicePreset['category']) => {
  return devicePresets.filter(preset => preset.category === category);
};

export const getPresetById = (id: string) => {
  return devicePresets.find(preset => preset.id === id);
};
