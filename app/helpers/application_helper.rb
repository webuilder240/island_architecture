module ApplicationHelper
  def vue_island(name, init_props: {})
    content_tag("vue-island", '', "data-name": name, "data-init-props": init_props.to_json)
  end
end
