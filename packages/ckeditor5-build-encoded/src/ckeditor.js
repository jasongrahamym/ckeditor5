/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

export default class EncodedEditor extends ClassicEditor {
	getData() {		
		return "Hello!";
	}

	setData( data ) {
		super.setData(data);
	}
}

