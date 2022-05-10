import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

export default class Patterns extends Plugin {
	static get pluginName() {
		return 'Patterns';
	}

	init() {
		const editor = this.editor;
		const t = editor.t;
		const model = editor.model;

		// Add the "myPlugin" button to feature components.
		editor.ui.componentFactory.add( 'myButton', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Patterns' ),
				tooltip: true
			} );

			// Insert a text into the editor after clicking the button.
			this.listenTo( view, 'execute', () => {
				model.change( writer => {
					const textNode = writer.createText( 'Hello CKEditor 5!' );

					model.insertContent( textNode );
				} );

				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}