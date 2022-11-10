<script>
import noContent from "@/components/widgets/pithnlch.json";
import FinishContent from "@/components/widgets/lupuorrc.json";
import Lottie from "@/components/widgets/lottie.vue";

export default {
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    wizard_header: {
      type: String,
      default: "Default Wizard Header",
    },
  },
  data() {
    return {
      noContentAnimation: {animationData: noContent},
      FinishContentAnimation: {animationData: FinishContent},
    };
  },
  components: {
    lottie: Lottie
  },
  mounted() {
    document.querySelectorAll(".form-steps").forEach(function (form) {

      form.querySelectorAll(".nexttab").forEach(function (nextButton) {
        var tabEl = form.querySelectorAll('button[data-bs-toggle="pill"]');
        tabEl.forEach(function (item) {
          item.addEventListener('show.bs.tab', function (event) {
            event.target.classList.add('done');
          });
        });

        nextButton.addEventListener("click", function () {
          var nextTab = nextButton.getAttribute('data-nexttab');
          document.getElementById(nextTab).click();
        });
      });

      //Pervies tab
      form.querySelectorAll(".previestab").forEach(function (prevButton) {

        prevButton.addEventListener("click", function () {
          var prevTab = prevButton.getAttribute('data-previous');
          var totalDone = prevButton.closest("form").querySelectorAll(".custom-nav .done").length;
          for (var i = totalDone - 1; i < totalDone; i++) {
            (prevButton.closest("form").querySelectorAll(".custom-nav .done")[i]) ? prevButton.closest("form").querySelectorAll(".custom-nav .done")[i].classList.remove('done') : '';
          }
          document.getElementById(prevTab).click();
        });

      });

      // Step number click
      var tabButtons = form.querySelectorAll('button[data-bs-toggle="pill"]');
      tabButtons.forEach(function (button, i) {
        button.setAttribute("data-position", i);
        button.addEventListener("click", function () {
          var getProgreebar = button.getAttribute("data-progressbar");
          if (getProgreebar) {
            var totallength = document.getElementById("custom-progress-bar").querySelectorAll("li").length - 1;
            var current = i;
            var percent = (current / totallength) * 100;
            document.getElementById("custom-progress-bar").querySelector('.progress-bar').style.width = percent + "%";
          }
          (form.querySelectorAll(".custom-nav .done").length > 0) ?
              form.querySelectorAll(".custom-nav .done").forEach(function (doneTab) {
                doneTab.classList.remove('done');
              }) : '';
          for (var j = 0; j <= i; j++) {
            tabButtons[j].classList.contains('active') ? tabButtons[j].classList.remove('done') : tabButtons[j].classList.add('done');
          }
        });
      });
    });
  }
};
</script>

<template>
  <div class="card">

    <div class="card-header">
      <h4 class="card-title mb-0">
        <slot name="wizard_header"> {{ wizard_header }}</slot>
      </h4>
    </div>

    <div class="card-body form-steps">
      <form class="vertical-navs-step">
        <div class="row gy-5">

          <div class="col-lg-3">
            <div class="nav flex-column custom-nav nav-pills" role="tablist" aria-orientation="vertical">
              <button v-for="(step, i) in steps" :key="step" class="nav-link"
                      :class="step.done === true ? ' done' : ''"
                      :id="'v-pills-' + step.data_target + '-tab'"
                      data-bs-toggle="pill"
                      :data-bs-target="'#v-pills-' + step.data_target"
                      type="button" role="tab"
                      :aria-controls="'v-pills-' + step.data_target"
                      aria-selected="true"
              >
                <span class="step-title me-2">
                  <i class="ri-close-circle-fill step-icon me-2"></i> Step {{ i + 1 }}
                </span>

                <slot :name="step.data_target">
                  <span> {{ step.title }} </span>
                </slot>

              </button>
            </div>
          </div>

          <div class="col-lg-9">
            <div class="px-lg-4">
              <div class="tab-content">

                <div v-for="(content,i) in steps" :key="content"
                     class="tab-pane fade" role="tabpanel"
                     :class="content.active === true ? ' show active' : ''"
                     :id="'v-pills-' + content.data_target"
                     :aria-labelledby="'v-pills-' + content.data_target + '-tab'"
                >
                  <div>
                    <slot :name="'content-' + content.data_target + '-body'">
                      <div class="text-center pt-4 pb-2">

                        <div class="mb-4">
                          <lottie
                              colors="primary:#45CB85,secondary:#4b38b3"
                              :options="noContentAnimation"
                              :height="120"
                              :width="120"
                          />
                        </div>
                        <h5>This tab does not contain any content</h5>
                        <p class="text-muted">
                          Please add content to this tab by using the slot named <br>
                          <code>content-{{ content.data_target }}-body</code>
                        </p>
                      </div>
                    </slot>
                  </div>

                  <div class="d-flex align-items-start gap-3 mt-4">

                    <slot :name="'previous-tab-' + content.data_target">
                      <button v-if="i > 0 && i < steps.length"
                              type="button" class="btn btn-light btn-label previestab"
                              :data-previous="'v-pills-' + ( steps[i-1].data_target ) + '-tab'">
                        <i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                        {{ 'Back to ' + steps[i - 1].title }}
                      </button>
                    </slot>

                    <div type="button" class="right ms-auto nexttab"
                         :data-nexttab="'v-pills-' + ( (steps.length - 1) > i ? steps[i+1].data_target : 'Finish' ) + '-tab'">
                      <slot :name="'next-tab-' + content.data_target">
                        <button type="button" class="btn btn-success btn-label right ms-auto">
                          <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                          {{ (steps.length - 1) > i ? 'Go to ' + steps[i + 1].title : 'Finish' }}
                        </button>
                      </slot>
                    </div>

                  </div>

                </div>

                <div class="tab-pane fade" id="v-pills-finish" role="tabpanel"
                     aria-labelledby="v-pills-finish-tab">
                  <div class="text-center pt-4 pb-2">

                    <div class="mb-4">
                      <lottie
                          colors="primary:#45CB85,secondary:#4b38b3"
                          :options="FinishContentAnimation"
                          :height="120"
                          :width="120"
                      />
                    </div>
                    <h5>Your Order is Completed !</h5>
                    <p class="text-muted">You Will receive an order confirmation email with details of your
                      order.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </form>
    </div>

  </div>
</template>