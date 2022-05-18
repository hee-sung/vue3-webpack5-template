export class ImageUtil {
  static imageLoadError (evt) {
    let defaultUrl = ''

    if (evt.target.src !== defaultUrl) {
      evt.target.src = defaultUrl
    }
  }

}