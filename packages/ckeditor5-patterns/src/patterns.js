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
						'ck-heading-dropdown'
					]
				}
			} );

			const items = new Collection()
			if (typeof editorPatterns !== 'undefined'){

				for (let i = 0; i < editorPatterns.length; i++)
				{
					items.add( {
						type: 'button',
						model: new Model( {
							withText: true,
							label: editorPatterns[i][0],
							class: 'test class',
							id: editorPatterns[i][1],
							tooltip: editorPatterns[i][1]	
						})
					});
				}
			}
			else{
				items.add( {
					type: 'button',
					model: new Model( {
						withText: true,
						label: 'No patterns',		
						id: '',
						tooltip: false
					})
				});		
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
