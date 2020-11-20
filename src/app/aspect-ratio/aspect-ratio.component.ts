import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  HostBinding,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { BehaviorSubject, combineLatest, fromEvent, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-aspect-ratio",
  templateUrl: "./aspect-ratio.component.html",
  styleUrls: ["./aspect-ratio.component.css"]
})
export class AspectRatioComponent implements AfterViewInit, OnDestroy {
  aspectRatio = window.document.createElement("div") as HTMLDivElement;
  style = window.document.createElement("style") as HTMLStyleElement;

  @Input() set ratio(ratio: string) {
    const [numerator, denominator] = (ratio || "16/9").split("/");
    this.numerator = parseInt(numerator, 10);
    this.denominator = parseInt(denominator, 10);
  }

  numerator$ = new BehaviorSubject<number>(16);
  @Input() set numerator(numerator: number) {
    this.numerator$.next(numerator);
  }
  denominator$ = new BehaviorSubject<number>(9);
  @Input() set denominator(denominator: number) {
    this.denominator$.next(denominator);
  }

  @Input() set align(align: string) {
    this.aspectRatio.setAttribute("data-align", align);
    if (this.mask) {
      this.resizeMask(this.mask.nativeElement, this.aspectRatio, this.resized);
    }
  }

  @Output() resized = new EventEmitter<ClientRect | DOMRect>();

  @ViewChild("aspectRatioFrame") aspectRatioFrame: ElementRef<
    HTMLIFrameElement
  >;
  @ViewChild("mask") mask: ElementRef<HTMLDivElement>;

  componentDestroyed$ = new Subject();

  constructor() {
    this.ratio = "16/9";
    this.align = "center";
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.aspectRatio.classList.add("aspect-ratio");
      this.aspectRatioFrame.nativeElement.contentDocument.body.appendChild(
        this.style
      );
      this.aspectRatioFrame.nativeElement.contentDocument.body.appendChild(
        this.aspectRatio
      );

      fromEvent(this.aspectRatioFrame.nativeElement.contentWindow, "resize")
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe(() =>
          this.resizeMask(
            this.mask.nativeElement,
            this.aspectRatio,
            this.resized
          )
        );

      this.resizeMask(this.mask.nativeElement, this.aspectRatio, this.resized);
    }, 100);

    combineLatest([this.numerator$, this.denominator$]).subscribe(
      ([numerator, denominator]) => {
        this.style.textContent = `
      html, body {
        margin: 0;
        padding: 0;
        background: transparent;
      }
      .aspect-ratio {
        margin: auto;
        position: absolute;
        --numerator: ${numerator};
        --denominator: ${denominator};
        max-width: 100%;
        max-height: 100%;
        height: calc(1vw * var(--denominator) / var(--numerator) * 100);
        width: calc(1vh * var(--numerator) / var(--denominator) * 100);
      }

      .aspect-ratio[data-align="center center"] {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
      .aspect-ratio[data-align="center"] {
        left: 0;
        right: 0;
      }
      .aspect-ratio[data-align="center top"] {
        left: 0;
        right: 0;
        top: 0;
      }
      .aspect-ratio[data-align="center bottom"] {
        left: 0;
        right: 0;
        bottom: 0;
      }
    `;

        this.resizeMask(
          this.mask.nativeElement,
          this.aspectRatio,
          this.resized
        );
      }
    );
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  resizeMask(
    mask: HTMLDivElement,
    aspectRatio: HTMLDivElement,
    eventEmitter: EventEmitter<ClientRect | DOMRect>
  ) {
    const coords = aspectRatio.getBoundingClientRect();
    mask.style.width = coords.width + "px";
    mask.style.height = coords.height + "px";
    mask.style.top = coords.top + "px";
    mask.style.bottom = coords.bottom + "px";
    mask.style.left = coords.left + "px";
    mask.style.right = coords.right + "px";
    eventEmitter.emit(coords);
  }
}
