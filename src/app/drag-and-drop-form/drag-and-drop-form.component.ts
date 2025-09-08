import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-drag-and-drop-form',
  templateUrl: './drag-and-drop-form.component.html',
  styleUrls: ['./drag-and-drop-form.component.css']
})
export class DragAndDropFormComponent {
  homePageForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.homePageForm = this.fb.group({
      sections: this.fb.array([])
    });

    // Initialize with one example section
    this.addSection('banner');
    this.addSection('benefit');
    this.addSection('trendingProducts');
    this.addSection('bigBanner');
    this.addSection('backToSchool');
    this.addSection('theseMightLike');
    this.addSection('brands');
  }

  // Getter for sections
  get sections(): FormArray<FormGroup> {
    return this.homePageForm.get('sections') as FormArray<FormGroup>;
  }

  // Add a section dynamically
  addSection(type: string): void {
    const section = this.fb.group({
      type: [type, Validators.required],
      data: this.buildSectionData(type)
    });
    this.sections.push(section);
  }

  // Duplicate a section
  duplicateSection(index: number): void {
    const section = this.sections.at(index).value;
    this.sections.insert(index + 1, this.fb.group({
      type: [section.type, Validators.required],
      data: this.buildSectionData(section.type, section.data)
    }));
  }

  // Drag & drop reordering
  drop(event: CdkDragDrop<FormGroup[]>): void {
    moveItemInArray(this.sections.controls, event.previousIndex, event.currentIndex);
  }

  // Build section-specific data with required fields
  private buildSectionData(type: string, existingData: any = null): FormGroup | FormArray {
    switch (type) {
      case 'banner': // 2 banners
        return this.fb.group({
          banners: this.fb.array(
            (existingData?.banners || Array(2).fill(null)).map((b: any) =>
              this.fb.group({
                image: [b?.image || '', Validators.required],
                sub: [b?.sub || '', Validators.required]
              })
            )
          )
        });

      case 'benefit': // 6 benefits
        return this.fb.group({
          benefits: this.fb.array(
            (existingData?.benefits || Array(6).fill('')).map((b: any) =>
              this.fb.control(b || '', Validators.required)
            )
          )
        });

      case 'trendingProducts': // 3 products
        return this.fb.group({
          products: this.fb.array(
            (existingData?.products || Array(3).fill(null)).map((p: any) =>
              this.fb.group({
                image: [p?.image || '', Validators.required],
                label: [p?.label || '', Validators.required],
                price: [p?.price || '', Validators.required],
                categoryId: [p?.categoryId || '', Validators.required]
              })
            )
          )
        });

      case 'bigBanner': // 1 banner
        return this.fb.group({
          image: [existingData?.image || '', Validators.required]
        });

      case 'backToSchool': // 4 banners
        return this.fb.group({
          banners: this.fb.array(
            (existingData?.banners || Array(4).fill(null)).map((b: any) =>
              this.fb.group({
                image: [b?.image || '', Validators.required]
              })
            )
          )
        });

      case 'theseMightLike': // 4 products
        return this.fb.group({
          products: this.fb.array(
            (existingData?.products || Array(4).fill(null)).map((p: any) =>
              this.fb.group({
                image: [p?.image || '', Validators.required],
                label: [p?.label || '', Validators.required],
                price: [p?.price || '', Validators.required],
                categoryId: [p?.categoryId || '', Validators.required],
                text: [p?.text || '', Validators.required]
              })
            )
          )
        });

      case 'brands': // 6 brands
        return this.fb.group({
          brands: this.fb.array(
            (existingData?.brands || Array(6).fill(null)).map((b: any) =>
              this.fb.group({
                image: [b?.image || '', Validators.required],
                label: [b?.label || '', Validators.required]
              })
            )
          )
        });

      default:
        return this.fb.group({});
    }
  }

  // Submit form
  onSubmit(): void {
    console.log('Homepage Data:', this.homePageForm.value);
    if (this.homePageForm.valid) {
    } else {
      this.homePageForm.markAllAsTouched();
    }
  }

  getSectionByType(section: AbstractControl, type:string): FormArray | null {
    return section.get(`data.${type}`) as FormArray | null;
  }
  
}