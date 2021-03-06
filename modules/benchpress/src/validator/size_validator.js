import { List, ListWrapper } from 'angular2/src/facade/collection';
import { bind, OpaqueToken } from 'angular2/di';

import { Validator } from '../validator';

/**
 * A validator that waits for the sample to have a certain size.
 */
export class SizeValidator extends Validator {
  // TODO(tbosch): use static values when our transpiler supports them
  static get BINDINGS() { return _BINDINGS; }
  // TODO(tbosch): use static values when our transpiler supports them
  static get SAMPLE_SIZE() { return _SAMPLE_SIZE; }

  _sampleSize:number;

  constructor(size) {
    super();
    this._sampleSize = size;
  }

  describe():any {
    return {
      'sampleSize': this._sampleSize
    };
  }

  validate(completeSample:List<any>):List<any> {
    if (completeSample.length >= this._sampleSize) {
      return ListWrapper.slice(completeSample, completeSample.length - this._sampleSize, completeSample.length);
    } else {
      return null;
    }
  }

}

var _SAMPLE_SIZE = new OpaqueToken('SizeValidator.sampleSize');
var _BINDINGS = [
  bind(Validator).toFactory(
    (size) => new SizeValidator(size),
    [_SAMPLE_SIZE]
  ),
  bind(_SAMPLE_SIZE).toValue(10)
];