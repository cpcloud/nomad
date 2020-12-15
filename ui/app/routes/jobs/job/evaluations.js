import Route from '@ember/routing/route';
import { collect } from '@ember/object/computed';
import { watchRelationship } from 'nomad-ui/utils/properties/watch';
// eslint-disable-next-line ember/no-mixins
import WithWatchers from 'nomad-ui/mixins/with-watchers';

export default class EvaluationsRoute extends Route.extend(WithWatchers) {
  model() {
    const job = this.modelFor('jobs.job');
    return job && job.get('evaluations').then(() => job);
  }

  startWatchers(controller, model) {
    if (model) {
      controller.set('watchEvaluations', this.watchEvaluations.perform(model));
    }
  }

  @watchRelationship('evaluations') watchEvaluations;

  @collect('watchEvaluations') watchers;
}
