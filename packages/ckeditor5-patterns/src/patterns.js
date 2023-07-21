import { Plugin } from 'ckeditor5/src/core';
import { createDropdown, addListToDropdown } from 'ckeditor5/src/ui';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';

export default class Patterns extends Plugin {
	static get pluginName() {
		return 'Patterns';
	}

	init() {
		const editor = this.editor;
		const t = editor.t;
		const model = editor.model;

		editor.ui.componentFactory.add('patternsDropdown', locale => {
			const dropdownView = createDropdown(locale);
			dropdownView.set({
				label: 'Patterns',
				tooltip: true
			});
			
			// Configure dropdown's button properties
			dropdownView.buttonView.set({
				label: 'Patterns',
				withText: true				
			});

			dropdownView.extendTemplate( {
				attributes: {
					class: [
						'ck-heading-dropdown', 'patterns-dropdown'
					]
				}
			} );

			const items = new Collection()
			var patterns = editor.config.get('patterns');
			if (patterns != null){

				for (let i = 0; i < patterns.length; i++)
				{
					items.add( {
						type: 'button',
						model: new Model( {
							withText: true,
							label: patterns[i].Name,
							class: 'test class',
							id: patterns[i].Pattern,
							tooltip: patterns[i].Pattern
						})
					});
				}
			}

            // Create a dropdown with a list inside the panel.
            addListToDropdown( dropdownView, items );

			// Execute command when an item from the dropdown is selected.
			this.listenTo( dropdownView, 'execute', evt => {
				const { id, label } = evt.source;
				model.change( writer => {
					const textNode = writer.createText(id);
					model.insertContent( textNode );
				} );

				editor.editing.view.focus();
			} );

            return dropdownView;
		});

	}
}
