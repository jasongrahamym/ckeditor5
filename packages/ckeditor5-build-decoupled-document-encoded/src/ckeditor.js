/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import DecoupledEditor from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';

export default class DecoupledEditorEncoded extends DecoupledEditor {
	getData() {		
		return "Hello!";
	}

	setData( data ) {
		super.setData(data);
	}
}