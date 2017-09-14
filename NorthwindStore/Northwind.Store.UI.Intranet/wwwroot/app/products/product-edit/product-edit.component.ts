import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    template: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe(
            params => {
                let id = +params['id'];
                // TODO Llamar a la lógica
                console.log(id);
            }
        );
    }

    onBack(): void {

        // Ir a la vista inicial
        this.router.navigate(['/products']);
    }
}
