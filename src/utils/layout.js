import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const isWebPreview = Platform.OS === 'web';

const nativeScaleFactor = Math.min(width / 430, height / 932, 1);

export function scale(size) {
  if (isWebPreview) {
    return size;
  }

  return Math.round(size * nativeScaleFactor);
}
