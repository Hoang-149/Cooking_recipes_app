import {Linking} from 'react-native';

export function nameValidator(name) {
  if (!name) return 'Tên công thức không thể để trống.';
  return '';
}
export function categoryValidator(category) {
  if (!category) return 'Danh mục không thể để trống.';
  return '';
}
export function commentValidator(comment) {
  if (!comment) return 'Comment không thể để trống.';
  return '';
}
export function replaycommentValidator(comment) {
  if (!comment) return 'Comment không thể để trống.';
  return '';
}
export function durationValidator(duration) {
  if (!duration) return 'Thời gian không thể để trống.';
  return '';
}
export function ingredientValidator(ingredient) {
  if (!ingredient) return 'Nguyên liệu không thể để trống.';
  return '';
}
export function stepsValidator(steps) {
  if (!steps) return 'Các bước thực hiện không thể để trống.';
  return '';
}

export const urlWebsiteValidator = url => {
  if (url) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (regex.test(url)) {
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          return 'Đường dẫn không đúng.';
        } else {
          return '';
        }
      });
    } else {
      return 'Đường dẫn không đúng.';
    }
  }
};

export const urlYoutubeValidator = url => {
  if (url) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (regex.test(url)) {
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          return 'Đường dẫn không đúng.';
        } else {
          return '';
        }
      });
    } else {
      return 'Đường dẫn không đúng.';
    }
  }
};

// export const urlYoutubeValidator = url => {
//   if (url) {
//     const regex = /^(ftp|http|https):\/\/[^ "]+$/;
//     if (regex.test(url)) {
//       Linking.canOpenURL(url).then(supported => {
//         if (!supported) {
//           return 'Đường dẫn không đúng.';
//         } else {
//           return '';
//         }
//       });
//     } else {
//       return 'Đường dẫn không đúng.';
//     }
//   }
// };
